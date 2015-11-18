// Copyright (c) 2015 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

'use strict';

/* global Buffer */

function JsonCase(args) {
    this.payload = args.payload;
    this.verify = args.verify;
}

JsonCase.prototype.bench = function benchJsonCase() {
    var text = JSON.stringify(this.payload);
    var length = Buffer.byteLength(text, 'utf8');
    var buffer = new Buffer(length);
    buffer.write(text, 0, 'utf8');
    text = buffer.toString('utf8', 0, length);
    var payload = JSON.parse(text);
    this.verify(payload);
};

function ThriftCase(args) {
    this.payload = args.payload;
    this.rw = args.rw;
}

ThriftCase.prototype.bench = function benchThriftCase() {
    var lenRes = this.rw.byteLength(this.payload);
    var buffer = new Buffer(lenRes.length);
    this.rw.writeInto(this.payload, buffer, 0);
    this.rw.readFrom(buffer, 0);
};

module.exports.JsonCase = JsonCase;
module.exports.ThriftCase = ThriftCase;
