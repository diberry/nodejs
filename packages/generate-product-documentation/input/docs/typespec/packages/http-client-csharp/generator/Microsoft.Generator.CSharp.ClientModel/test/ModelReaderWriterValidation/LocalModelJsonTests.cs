// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System.ClientModel.Primitives;
using Microsoft.Generator.CSharp.Tests.Common;
using NUnit.Framework;

namespace Microsoft.Generator.CSharp.ClientModel.Tests.ModelReaderWriterValidation
{
    public abstract class LocalModelJsonTests<T> : LocalModelTests<T> where T : IJsonModel<T>
    {
        [TestCase("J")]
        [TestCase("W")]
        public void RoundTripWithJsonInterfaceOfT(string format)
          => RoundTripTest(format, new JsonInterfaceStrategy<T>());

        [TestCase("J")]
        [TestCase("W")]
        public void RoundTripWithJsonInterfaceNonGeneric(string format)
              => RoundTripTest(format, new JsonInterfaceAsObjectStrategy<T>());

        [TestCase("J")]
        [TestCase("W")]
        public void RoundTripWithJsonInterfaceUtf8Reader(string format)
            => RoundTripTest(format, new JsonInterfaceUtf8ReaderStrategy<T>());

        [TestCase("J")]
        [TestCase("W")]
        public void RoundTripWithJsonInterfaceUtf8ReaderNonGeneric(string format)
            => RoundTripTest(format, new JsonInterfaceUtf8ReaderAsObjectStrategy<T>());
    }
}
