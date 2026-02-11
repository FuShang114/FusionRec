# recommend-jni

JNI bridge for online recommendation inference.

## Overview

- Java calls native `reco_jni` library.
- Native layer embeds Python and calls:
  - `online.online_infer.infer(openid, scene, goods_ids_json, cf_w, ctr_w, cvr_w)`

## Build Notes (Windows)

- Require JDK headers (`JAVA_HOME/include` and `JAVA_HOME/include/win32`)
- Require Python headers and libs.
- Set environment variable:
  - `RECO_PYTHON_ROOT` (path to `recommend-engine-python`)

This project provides source scaffold; build script should be adapted to your local compiler toolchain.
