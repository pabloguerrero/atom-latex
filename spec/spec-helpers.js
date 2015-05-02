"use babel";

import "./spec-bootstrap";

import fs from "fs-plus";
import temp from "temp";
import wrench from "wrench";

export function cloneFixtures() {
  const tempPath = fs.realpathSync(temp.mkdirSync("latex"));
  let fixturesPath = atom.project.getPaths()[0];
  wrench.copyDirSyncRecursive(fixturesPath, tempPath, {forceDelete: true});
  atom.project.setPaths([tempPath]);
  fixturesPath = tempPath;

  return fixturesPath;
}

export function overridePlatform(name) {
  Object.defineProperty(process, "platform", {__proto__: null, value: name});
}

export function spyOnConfig(key, value) {
  const get = atom.config.get;
  global.spyOn(atom.config, "get").andCallFake(_key => {
    if (_key === key) { return value; }
    return get.call(atom.config, key);
  });
}

export function setTimeoutInterval(interval) {
  const env = global.jasmine.getEnv();
  const originalInterval = env.defaultTimeoutInterval;
  env.defaultTimeoutInterval = interval;

  return originalInterval;
}
