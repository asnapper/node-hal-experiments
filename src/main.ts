import { ResourceBuilder } from './lib'

const r = new ResourceBuilder()
    .setLink('self', { href: '/me' })
    .toResource()

// console.log(JSON.stringify(r, null, 4))