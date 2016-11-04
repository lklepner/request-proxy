#!/usr/bin/env bash
PATH=/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin:$PATH
APPROOT=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd $APPROOT
NODE_ENV=local \
DEBUG=request-proxy:* \
forever -v -w --watchDirectory $APPROOT --minUptime 1000 --spinSleepTime 1000 \
-l $APPROOT'/logs/forever.log' -o $APPROOT'/logs/forever.out' -e $APPROOT'/logs/forever.err' \
$APPROOT'/bin/www'