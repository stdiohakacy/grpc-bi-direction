const grpc = require('@grpc/grpc-js');
const greets = require('../server/protos/greet_pb');
const service = require('../server/protos/greet_grpc_pb');

async function sleep(interval) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), interval);
    });
}

async function greetEveryone(call, callback) {
    call.on('data', response => {
        const fullName = `${response.getGreet().getFirstName()} ${response.getGreet().getLastName()}`;
        console.log(fullName)
        // callback(null, fullName);
    });
    call.on('error', error => {
        console.log(error);
    });
    call.on('end', () => {
        console.log('Ended!');
    });

    for(let i = 0; i < 10; i++) {
        // const greeting = new greets.Greeting();
        // greeting.setFirstName("Nguyen");
        // greeting.setLastName("Duy");

        const response = new greets.GreetEveryoneResponse();
        // response.setGreet(greeting);
        response.setResult("Full name from server");
        call.write(response);
        await sleep(3000);
    }
    // Server will auto call end but this command will client call end
    call.end();
}

function main() {
    const server = new grpc.Server();
    server.addService(service.GreetServiceService, { greetEveryone });
    server.bindAsync('localhost:50051', 
    grpc.ServerCredentials.createInsecure(), 
    () => {
        console.log("Server start on localhost:50051");
        server.start();
    });
}

main();