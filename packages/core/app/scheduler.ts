type Scheduler = null | (() => Promise<void>)
let queue: Scheduler[] = []
const transitions: Array<() => void> = []

const threshold = 10
let deadline = 0

const getFirst = () => queue[0] || null
const getTime = () => performance.now()
const shouldYield = () => getTime() >= deadline // 可执行状态
let translate = task(false)

async function flush() {
  deadline = getTime() + threshold
  let job = getFirst()
  while (job && !shouldYield()) {
    await job()
    queue.shift()
    job = getFirst()
  }
  if (shouldYield() && job) {
    // 将剩余任务推至下次宏任务
    (translate = task(shouldYield())) && startTransition(flush)
  }
}

function task(pending: boolean) {
  const cb = () => {
    const peek = transitions.shift()
    peek && peek()
  }
  if (!pending && typeof Promise !== 'undefined') {
    // 默认情况下丢进微任务中
    return () => queueMicrotask(cb)
  }
  if (typeof MessageChannel !== 'undefined') {
    // 微任务下的宏任务
    const { port1, port2 } = new MessageChannel()
    port1.onmessage = cb
    return () => port2.postMessage(null)
  }

  // 宏任务
  return () => setTimeout(cb)
}

function startTransition(cb: () => void) {
  transitions.push(cb) && translate()
}

export function injectSchedulerCbs(cbs: Scheduler[]) {
  queue = cbs
  startTransition(flush)
}
