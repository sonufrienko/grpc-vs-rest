# Compare gRPC and REST performance on Node.js
Let's compare performance (time to make 10M requests) of three inter-service communications on Node.js microservices.
- REST HTTP1.1 (JSON)
- REST HTTP1.1 + Keep-Alive (JSON)
- gRPC (Protobuf)

## How I test
I did tests with c5.large AWS instances. I use two instances in the same region and the same AZ. Each instance starts Node.js app in a single process. Service-A (client) sends 1M of sequential requests to the Service-B (server).

### REST test
Service A (client)
- Ubuntu Server 18.04 LTS
- Node v10.15.0 LTS
- request v2.88.0

Service B (server)
- Ubuntu Server 18.04 LTS
- Node v10.15.0 LTS
- express v4.16.4

### gRPC test
Service A (client)
- Ubuntu Server 18.04 LTS
- Node v10.15.0 LTS
- grpc v1.18.0
- @grpc/proto-loader v0.4.0

Service B (server)
- Ubuntu Server 18.04 LTS
- Node v10.15.0 LTS
- grpc v1.18.0
- @grpc/proto-loader v0.4.0

[Research results](#)