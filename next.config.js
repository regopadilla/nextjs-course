const { PHASE_DEVELOPMENT_SERVER,Pha } = require('next/constants')

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                mongodb_username: 'admin',
                mongodb_password: 'test',
                mongodb_cluster: 'cluster0',
                mongodb_database: 'my-site-dev'
            }
        }
    }
    return {
        env: {
            mongodb_username: 'admin',
            mongodb_password: 'test',
            mongodb_cluster: 'cluster0',
            mongodb_database: 'my-site'
        }
    }
}