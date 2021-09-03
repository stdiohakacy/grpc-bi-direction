// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var protos_greet_pb = require('../protos/greet_pb.js');

function serialize_greet_GreetEveryoneRequest(arg) {
  if (!(arg instanceof protos_greet_pb.GreetEveryoneRequest)) {
    throw new Error('Expected argument of type greet.GreetEveryoneRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_GreetEveryoneRequest(buffer_arg) {
  return protos_greet_pb.GreetEveryoneRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_GreetEveryoneResponse(arg) {
  if (!(arg instanceof protos_greet_pb.GreetEveryoneResponse)) {
    throw new Error('Expected argument of type greet.GreetEveryoneResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_GreetEveryoneResponse(buffer_arg) {
  return protos_greet_pb.GreetEveryoneResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var GreetServiceService = exports.GreetServiceService = {
  // bi-direction
greetEveryone: {
    path: '/greet.GreetService/GreetEveryone',
    requestStream: true,
    responseStream: true,
    requestType: protos_greet_pb.GreetEveryoneRequest,
    responseType: protos_greet_pb.GreetEveryoneResponse,
    requestSerialize: serialize_greet_GreetEveryoneRequest,
    requestDeserialize: deserialize_greet_GreetEveryoneRequest,
    responseSerialize: serialize_greet_GreetEveryoneResponse,
    responseDeserialize: deserialize_greet_GreetEveryoneResponse,
  },
};

exports.GreetServiceClient = grpc.makeGenericClientConstructor(GreetServiceService);
