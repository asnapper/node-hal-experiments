import { Link } from './lib'

const userLink = new Link('/users/1', 'https', 'localhost', 443, '/api/v1')
const groupLink = new Link('/groups/1', 'https', 'localhost', 443, '/api/v1')
const chainedLink = new Link('/something/1')
    .setProtocol('https')
    .setHost('localhost')
    .setPort(443)
    .setPrefix('/api/v1')

const parsedLink1 = Link.fromExternalLink('http://bla.bla.com/api/v1/users/1', '/api/v1')
const parsedLink2 = Link.fromExternalLink('http://bla.bla.com:80/api/v1/users/1', '/api/v1')
const parsedLink3 = Link.fromExternalLink('http://bla.bla.com:8080/api/v1/users/1', '/api/v1')

console.log(userLink.toInternalLink(), userLink.toExternalLink())
console.log(groupLink.toInternalLink(), groupLink.toExternalLink())
console.log(chainedLink.toInternalLink(), chainedLink.toExternalLink())

console.log(parsedLink1.toInternalLink(), parsedLink1.toExternalLink())
console.log(parsedLink2.toInternalLink(), parsedLink2.toExternalLink())
console.log(parsedLink3.toInternalLink(), parsedLink3.toExternalLink())