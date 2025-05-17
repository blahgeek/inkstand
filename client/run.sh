#!/bin/bash

cd "$(dirname "$0")"

exec uv run --env-file ./.env ./main.py "$@"
