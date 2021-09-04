const greets = require('../server/protos/greet_pb');
const service = require('../server/protos/greet_grpc_pb');
const grpc = require('@grpc/grpc-js');

async function sleep(interval) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), interval);
    });
}

async function callBiDirect() {
    console.log(`gRPC Client`);
    const client = new service.GreetServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );
    const request = new greets.GreetEveryoneRequest();
    const call = client.greetEveryone(request, (error, response) => {
        console.log(`Server response ${response}`);
    });
    call.on('data', response => {
        console.log(response.getResult());
    });
    call.on('error', error => { console.log(error); });
    call.on('end', () => { console.log(`Server Ended!`); });

    for(let i = 0; i < 10; i++) {
        const greeting = new greets.Greeting();
        greeting.setFirstName("Full name");
        greeting.setLastName(" from client");
        const request = new greets.GreetEveryoneRequest();
        request.setGreet(greeting);
        call.write(request);
        await sleep(1500);
    }

    call.end();
}

function main() {
    callBiDirect();
}

main()