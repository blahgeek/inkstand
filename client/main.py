#!/usr/bin/env python3
# /// script
# requires-python = ">=3.8"
# dependencies = [
#     "RPi.bme280",
#     "pillow",
#     "requests",
# ]
# ///

import urllib.parse
import io
import os
import logging
import requests
import time
import datetime
import subprocess
from PIL import Image, ImageDraw, ImageFont


def read_environment():
    import smbus2
    import bme280

    PORT = 1
    ADDRESS = 0x76

    bus = smbus2.SMBus(PORT)
    calibration_params = bme280.load_calibration_params(bus, ADDRESS)
    # the sample method will take a single reading and return a
    # compensated_reading object
    # containing properties: temperature, pressure, humidity
    return bme280.sample(bus, ADDRESS, calibration_params)

SCREEN_WIDTH = 1072
SCREEN_HEIGHT = 1448

def render_screenshot_cloud(env) -> bytes:
    TIMEOUT = 15
    VIEWPORT = {
        'width': SCREEN_WIDTH // 2,
        'height': SCREEN_HEIGHT // 2,
        'deviceScaleFactor': 2,
    }
    GOTO_OPTIONS = {
        'waitUntil': 'networkidle0',
        'timeout': TIMEOUT * 2 // 3 * 1000,
    }
    BASE_URL = 'https://inkstand.pages.dev/'

    cf_account_id = os.environ['CF_ACCOUNT_ID']
    cf_api_token = os.environ['CF_API_TOKEN']

    resp = requests.post(
        f'https://api.cloudflare.com/client/v4/accounts/{cf_account_id}/browser-rendering/screenshot',
        headers={
            'Authorization': f'Bearer {cf_api_token}',
        },
        json={
            'url': BASE_URL + '?' + (
                urllib.parse.urlencode({
                    'env_t': str(int(env.temperature)),
                    'env_p': str(int(env.pressure)),
                    'env_h': str(int(env.humidity)),
                }) if env else ''),
            'viewport': VIEWPORT,
            'gotoOptions': GOTO_OPTIONS,
        },
        timeout=TIMEOUT,
    )
    resp.raise_for_status()
    if resp.headers.get('content-type') != 'image/png':
        raise ValueError('Invalid response')

    return resp.content

def render_simple_locally() -> bytes:
    FONT_SIZE = SCREEN_WIDTH // 8

    image = Image.new('RGB', (SCREEN_WIDTH, SCREEN_HEIGHT), color='white')
    draw = ImageDraw.Draw(image)

    font = ImageFont.load_default(size=FONT_SIZE)
    text = 'NETWORK\nERROR\n\n' + datetime.datetime.now().strftime('%Y-%m-%d\n%H:%M')

    draw.text((SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2), text,
              font=font, fill='black', anchor='mm', align='center')

    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format='PNG')
    return img_byte_arr.getvalue()

def render_screenshot_with_fallback(env) -> bytes:
    try:
        return render_screenshot_cloud(env)
    except (requests.RequestException, ValueError):
        logging.exception('Cannot render screenshot from cloud, fallback to local')
        return render_simple_locally()


def showimg(binary_path: str, image_path: str):
    DEFAULT_ARGS = ['--vcom', '2.15', '--rotate', '90']
    USBID = '048d:8951'

    mode = 'gc16' if int(time.time()) % 3600 == 0 else 'gl16'
    cmd = [binary_path, *DEFAULT_ARGS, '--mode', mode]
    if time.monotonic() < 180:
        cmd.append('--reset')
    cmd.append(image_path)

    for _ in range(5):
        try:
            logging.info('Running %s', cmd)
            subprocess.run(cmd, check=True)
            break
        except subprocess.SubprocessError:
            logging.error('showimg failed, reset and retry...')
            subprocess.run(['usbreset', USBID])
            time.sleep(3)
    else:
        logging.error('showimg failed without further retry')


if __name__ == '__main__':
    import argparse

    logging.basicConfig(level=logging.INFO)

    parser = argparse.ArgumentParser()
    parser.add_argument('image_filepath', help='Path to save the image file (xxx.png).')
    parser.add_argument('--local-only', action='store_true')
    parser.add_argument('--showimg', help="Path to showimg binary. Only show image when this is set")
    args = parser.parse_args()

    env = None
    try:
        env = read_environment()
        logging.info('Read environment: %s', env)
    except (ImportError, IOError):
        logging.exception('Cannot read environment, skip')

    png_content = render_simple_locally() \
        if args.local_only else render_screenshot_with_fallback(env)
    with open(args.image_filepath, 'wb') as f:
        f.write(png_content)

    if args.showimg:
        showimg(args.showimg, args.image_filepath)

