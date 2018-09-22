export type Protocol = 'http' | 'https'

export class Link {
    constructor(
        private internalLink?: string,
        private proto?: Protocol,
        private host?: string,
        private port?: number,
        private prefix?: string
    ) {}

    static fromExternalLink(externalLink: string, prefix: string): Link {
        const re = /(https?):\/\/([^\/\:]+)(\:(\d+))?(\/.+)/g
        const [ , protocol, host, , port, path ] = re.exec(externalLink)

        return new Link()
            .setProtocol(<Protocol>protocol)
            .setHost(host)
            .setPort(port && parseInt(port, 10))
            .setPrefix(prefix)
            .setInternalLink(path.replace(prefix, ''))
    }

    setInternalLink(internalLink: string): Link {
        this.internalLink = internalLink
        return this
    }

    setProtocol(proto: Protocol): Link {
        this.proto = proto
        return this
    }

    setHost(host: string): Link {
        this.host = host
        return this
    }

    setPort(port: number): Link {
        this.port = port
        return this
    }

    setPrefix(prefix: string): Link {
        this.prefix = prefix
        return this
    }

    toInternalLink(): string {
        return this.internalLink
    }

    toExternalLink(): string {
        const omitPort = !this.port
         || (this.proto === 'http' && this.port === 80)
         || (this.proto === 'https' && this.port === 443)

         return `${this.proto}://${this.host}${omitPort ? '' : (':' + this.port)}${this.prefix}${this.internalLink}`
    }
}
