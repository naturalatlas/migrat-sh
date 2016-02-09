#!/bin/bash
set -e

if [[ "${MIGRAT_ACTION}" == "up" ]]; then
	>&2 echo "a"
	echo "b"
	echo "UP"
	echo "c"
	>&2 echo "d"
elif [[ "${MIGRAT_ACTION}" == "down" ]]; then
	>&2 echo "a"
	echo "b"
	echo "DOWN"
	echo "c"
	>&2 echo "d"
fi
