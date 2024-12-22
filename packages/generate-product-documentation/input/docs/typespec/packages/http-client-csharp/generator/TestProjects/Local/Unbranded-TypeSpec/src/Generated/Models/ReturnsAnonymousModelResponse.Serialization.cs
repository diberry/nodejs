// <auto-generated/>

#nullable disable

using System;
using System.ClientModel;
using System.ClientModel.Primitives;
using System.Collections.Generic;
using System.Text.Json;
using UnbrandedTypeSpec;

namespace UnbrandedTypeSpec.Models
{
    /// <summary></summary>
    public partial class ReturnsAnonymousModelResponse : IJsonModel<ReturnsAnonymousModelResponse>
    {
        void IJsonModel<ReturnsAnonymousModelResponse>.Write(Utf8JsonWriter writer, ModelReaderWriterOptions options)
        {
            writer.WriteStartObject();
            JsonModelWriteCore(writer, options);
            writer.WriteEndObject();
        }

        /// <param name="writer"> The JSON writer. </param>
        /// <param name="options"> The client options for reading and writing models. </param>
        protected virtual void JsonModelWriteCore(Utf8JsonWriter writer, ModelReaderWriterOptions options)
        {
            string format = options.Format == "W" ? ((IPersistableModel<ReturnsAnonymousModelResponse>)this).GetFormatFromOptions(options) : options.Format;
            if (format != "J")
            {
                throw new FormatException($"The model {nameof(ReturnsAnonymousModelResponse)} does not support writing '{format}' format.");
            }
            if (options.Format != "W" && _additionalBinaryDataProperties != null)
            {
                foreach (var item in _additionalBinaryDataProperties)
                {
                    writer.WritePropertyName(item.Key);
#if NET6_0_OR_GREATER
                    writer.WriteRawValue(item.Value);
#else
                    using (JsonDocument document = JsonDocument.Parse(item.Value))
                    {
                        JsonSerializer.Serialize(writer, document.RootElement);
                    }
#endif
                }
            }
        }

        ReturnsAnonymousModelResponse IJsonModel<ReturnsAnonymousModelResponse>.Create(ref Utf8JsonReader reader, ModelReaderWriterOptions options) => JsonModelCreateCore(ref reader, options);

        /// <param name="reader"> The JSON reader. </param>
        /// <param name="options"> The client options for reading and writing models. </param>
        protected virtual ReturnsAnonymousModelResponse JsonModelCreateCore(ref Utf8JsonReader reader, ModelReaderWriterOptions options)
        {
            string format = options.Format == "W" ? ((IPersistableModel<ReturnsAnonymousModelResponse>)this).GetFormatFromOptions(options) : options.Format;
            if (format != "J")
            {
                throw new FormatException($"The model {nameof(ReturnsAnonymousModelResponse)} does not support reading '{format}' format.");
            }
            using JsonDocument document = JsonDocument.ParseValue(ref reader);
            return DeserializeReturnsAnonymousModelResponse(document.RootElement, options);
        }

        internal static ReturnsAnonymousModelResponse DeserializeReturnsAnonymousModelResponse(JsonElement element, ModelReaderWriterOptions options)
        {
            if (element.ValueKind == JsonValueKind.Null)
            {
                return null;
            }
            IDictionary<string, BinaryData> additionalBinaryDataProperties = new ChangeTrackingDictionary<string, BinaryData>();
            foreach (var prop in element.EnumerateObject())
            {
                if (options.Format != "W")
                {
                    additionalBinaryDataProperties.Add(prop.Name, BinaryData.FromString(prop.Value.GetRawText()));
                }
            }
            return new ReturnsAnonymousModelResponse(additionalBinaryDataProperties);
        }

        BinaryData IPersistableModel<ReturnsAnonymousModelResponse>.Write(ModelReaderWriterOptions options) => PersistableModelWriteCore(options);

        /// <param name="options"> The client options for reading and writing models. </param>
        protected virtual BinaryData PersistableModelWriteCore(ModelReaderWriterOptions options)
        {
            string format = options.Format == "W" ? ((IPersistableModel<ReturnsAnonymousModelResponse>)this).GetFormatFromOptions(options) : options.Format;
            switch (format)
            {
                case "J":
                    return ModelReaderWriter.Write(this, options);
                default:
                    throw new FormatException($"The model {nameof(ReturnsAnonymousModelResponse)} does not support writing '{options.Format}' format.");
            }
        }

        ReturnsAnonymousModelResponse IPersistableModel<ReturnsAnonymousModelResponse>.Create(BinaryData data, ModelReaderWriterOptions options) => PersistableModelCreateCore(data, options);

        /// <param name="data"> The data to parse. </param>
        /// <param name="options"> The client options for reading and writing models. </param>
        protected virtual ReturnsAnonymousModelResponse PersistableModelCreateCore(BinaryData data, ModelReaderWriterOptions options)
        {
            string format = options.Format == "W" ? ((IPersistableModel<ReturnsAnonymousModelResponse>)this).GetFormatFromOptions(options) : options.Format;
            switch (format)
            {
                case "J":
                    using (JsonDocument document = JsonDocument.Parse(data))
                    {
                        return DeserializeReturnsAnonymousModelResponse(document.RootElement, options);
                    }
                default:
                    throw new FormatException($"The model {nameof(ReturnsAnonymousModelResponse)} does not support reading '{options.Format}' format.");
            }
        }

        string IPersistableModel<ReturnsAnonymousModelResponse>.GetFormatFromOptions(ModelReaderWriterOptions options) => "J";

        /// <param name="returnsAnonymousModelResponse"> The <see cref="ReturnsAnonymousModelResponse"/> to serialize into <see cref="BinaryContent"/>. </param>
        public static implicit operator BinaryContent(ReturnsAnonymousModelResponse returnsAnonymousModelResponse)
        {
            if (returnsAnonymousModelResponse == null)
            {
                return null;
            }
            return BinaryContent.Create(returnsAnonymousModelResponse, ModelSerializationExtensions.WireOptions);
        }

        /// <param name="result"> The <see cref="ClientResult"/> to deserialize the <see cref="ReturnsAnonymousModelResponse"/> from. </param>
        public static explicit operator ReturnsAnonymousModelResponse(ClientResult result)
        {
            using PipelineResponse response = result.GetRawResponse();
            using JsonDocument document = JsonDocument.Parse(response.Content);
            return DeserializeReturnsAnonymousModelResponse(document.RootElement, ModelSerializationExtensions.WireOptions);
        }
    }
}