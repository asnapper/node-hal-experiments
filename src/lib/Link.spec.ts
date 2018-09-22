import { Link } from './Link'

describe('Link transformation', () => {
    it('should render a chained linkcorrectly', () => {
        const link = new Link('/users/1')
            .setProtocol('http')
            .setHost('bla.bla.com')
            .setPort(80)
            .setPrefix('/api/v1')
        expect(link.toExternalLink()).toBe('http://bla.bla.com/api/v1/users/1')
        expect(link.toInternalLink()).toBe('/users/1')
    })
    it('should render a link without port correctly', () => {
        const link = new Link('/users/1', 'http', 'bla.bla.com', undefined, '/api/v1')
        expect(link.toExternalLink()).toBe('http://bla.bla.com/api/v1/users/1')
        expect(link.toInternalLink()).toBe('/users/1')
    })
    it('should render a link with a standard port correctly', () => {
        const link = new Link('/users/1', 'http', 'bla.bla.com', 80, '/api/v1')
        expect(link.toExternalLink()).toBe('http://bla.bla.com/api/v1/users/1')
        expect(link.toInternalLink()).toBe('/users/1')
    })
    it('should render a link with a non-standard port correctly', () => {
        const link = new Link('/users/1', 'http', 'bla.bla.com', 8080, '/api/v1')
        expect(link.toExternalLink()).toBe('http://bla.bla.com:8080/api/v1/users/1')
        expect(link.toInternalLink()).toBe('/users/1')
    })
    it('should parse an url without port correctly', () => {
        const link = Link.fromExternalLink('http://bla.bla.com/api/v1/users/1', '/api/v1')
        expect(link.toExternalLink()).toBe('http://bla.bla.com/api/v1/users/1')
        expect(link.toInternalLink()).toBe('/users/1')
    })
    it('should parse an url with a standard port correctly', () => {
        const link = Link.fromExternalLink('http://bla.bla.com:80/api/v1/users/1', '/api/v1')
        expect(link.toExternalLink()).toBe('http://bla.bla.com/api/v1/users/1')
        expect(link.toInternalLink()).toBe('/users/1')
    })
    it('should parse an url with a non-standard port correctly', () => {
        const link = Link.fromExternalLink('http://bla.bla.com:8080/api/v1/users/1', '/api/v1')
        expect(link.toExternalLink()).toBe('http://bla.bla.com:8080/api/v1/users/1')
        expect(link.toInternalLink()).toBe('/users/1')
    })
})
