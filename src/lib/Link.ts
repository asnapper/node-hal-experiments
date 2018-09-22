export const Protocol = {
    HTTP: 'http',
    HTTPS: 'https'
}

export type Protocol = keyof typeof Protocol;

export enum Port {
    HTTP = 80,
    HTTPS = 443
}

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
            .setProtocol(<Protocol>protocol.toLowerCase())
            .setHost(host.toLowerCase())
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
         || (this.proto === Protocol.HTTP && this.port === Port.HTTP)
         || (this.proto === Protocol.HTTPS && this.port === Port.HTTPS)

         return `${this.proto}://${this.host}${omitPort ? '' : (':' + this.port)}${this.prefix}${this.internalLink}`
    }
}
