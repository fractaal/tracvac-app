export default interface Config {
    /**
     * Location of the Tracvac site.
     */
    location: string;
    /**
     * Link to the LGU's website
     */
    lguUrl: string;
    /**
     * Secret key.
     */
    secret: string;
    httpPort: string;
    httpsPort: string;
    adminPassword: string;
}
