#!/bin/sh
set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
release_version=${1:-0.3.1}
work_dir="$project_dir/work"
stage_dir=$(mktemp -d)
trap 'rm -rf "$stage_dir"' EXIT INT TERM

mkdir -p "$work_dir" "$stage_dir/dist" "$stage_dir/.vscode"
cp -R "$project_dir/dist/." "$stage_dir/dist/"
rm -rf "$stage_dir/dist/pyodide"
sed \
  -e 's#import { loadPyodide } from "\./pyodide/pyodide.mjs";#import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v314.0.6/full/pyodide.mjs";#' \
  -e 's#const PYODIDE_ROOT = new URL("\./pyodide/", self.location.href).href;#const PYODIDE_ROOT = "https://cdn.jsdelivr.net/pyodide/v314.0.6/full/";#' \
  "$project_dir/dist/pyodide-worker.js" > "$stage_dir/dist/pyodide-worker.js"
cp "$project_dir/.vscode/preview.yml" "$stage_dir/.vscode/preview.yml"

archive="$work_dir/huixie-cloudstudio-v$release_version.zip"
rm -f "$archive"
(cd "$stage_dir" && zip -qr "$archive" dist .vscode)

unzip -p "$archive" dist/pyodide-worker.js | grep -q 'cdn.jsdelivr.net/pyodide/v314.0.6/full/pyodide.mjs'
unzip -Z1 "$archive" | grep -q '^dist/judge.js$'
if unzip -Z1 "$archive" | grep -q '^dist/pyodide/'; then
  printf 'Cloud Studio archive unexpectedly contains the self-hosted runtime.\n' >&2
  exit 1
fi

printf '%s\n' "$archive"
