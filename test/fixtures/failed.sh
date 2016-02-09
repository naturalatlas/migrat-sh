#!/bin/bash
set -e

if [[ "${MIGRAT_ACTION}" == "up" ]]; then
	echo "stdout message"
	>&2 echo "this is supposed to fail"
	exit 1
elif [[ "${MIGRAT_ACTION}" == "down" ]]; then
	echo "stdout message"
	>&2 echo "this is supposed to fail"
	exit 1
fi
