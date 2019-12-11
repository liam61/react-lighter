import { PREFIXCLS } from "common";
import request from "./request";

function getUid(len = 10) {
  const uid = Math.random()
    .toString(35)
    .slice(2, len);
  return `${PREFIXCLS}-${uid}`;
}

function emptyFn() {}

function getLocalDate(date: Date) {
  return date.toLocaleString("zh", { hour12: false }).replace(/\//g, "-");
}

export { getUid, emptyFn, request, getLocalDate };
