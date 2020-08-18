import { PREFIXCLS } from 'common'
import request from './request'

function getUid() {
  return `${PREFIXCLS}-${Math.random().toString(36).slice(-8)}`
}

function getLocalDate(date: Date) {
  return date.toLocaleString('zh', { hour12: false }).replace(/\//g, '-')
}

export { getUid, request, getLocalDate }
