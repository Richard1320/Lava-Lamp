#!/bin/bash
npm run scssw &
P1=$!
npm run wpw &
P2=$!
wait $P1 $P2
