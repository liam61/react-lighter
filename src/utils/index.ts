import uid from 'uid';
import { PREFIXCLS } from 'common';
import request from './request';

function getUid(len = 10) {
  return `${PREFIXCLS}-${uid(len)}`;
}

// tslint:disable-next-line: no-empty
function emptyFn() {}

function getLocalDate(date: Date) {
  return date.toLocaleString('zh', { hour12: false }).replace(/\//g, '-');
}

export { getUid, emptyFn, request, getLocalDate };
