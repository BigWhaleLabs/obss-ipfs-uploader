# OBSS IPFS uploader

Takes JSON, uploads it to IPFS and returns the cid.

## Installation and local launch

1. Clone this repo: `git clone https://github.com/backmeupplz/obss-ipfs-uploader`
2. _(Optional)_ Create `.env` with the environment variables listed below
3. Run `docker-compose up`

And you should be good to go! Feel free to fork and submit pull requests.

## Environment variables

| Name                 | Description                                                                          |
| -------------------- | ------------------------------------------------------------------------------------ |
| `DOMAIN`             | Domain name for caddy, DNS should point at the IP where the code is hosted           |
| `IPFS`               | IPFS node for file uploading and pinning (defaults to `http://ipfs:5001/api/v0`)     |
| `MONGO`              | URL of the MongoDB instance (defaults to `mongodb://mongo:27017/obss-ipfs-uploader`) |
| `ENVIRONMENT`        | Environment name (defaults to `development`)                                         |
| `IPFS_IP_ADDRESS`    | IP Address for colocated IPFS deployment                                             |
| `IPFS_ID`            | IPFS ID for colocated IPFS deployment                                                |
| `FILEBASE_API_TOKEN` | Bearer Auth Token for backup IPFS service (Filebase)                                 |

Also, please, consider looking at `.env.sample`.
