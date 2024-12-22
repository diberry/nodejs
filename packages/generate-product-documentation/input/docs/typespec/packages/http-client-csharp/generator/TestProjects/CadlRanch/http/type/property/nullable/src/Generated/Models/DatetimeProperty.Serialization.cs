// <auto-generated/>

#nullable disable

using System;
using System.ClientModel;
using System.ClientModel.Primitives;
using System.Text.Json;

namespace _Type.Property.Nullable.Models
{
    public partial class DatetimeProperty : IJsonModel<DatetimeProperty>
    {
        void IJsonModel<DatetimeProperty>.Write(Utf8JsonWriter writer, ModelReaderWriterOptions options) => throw null;

        protected virtual void JsonModelWriteCore(Utf8JsonWriter writer, ModelReaderWriterOptions options) => throw null;

        DatetimeProperty IJsonModel<DatetimeProperty>.Create(ref Utf8JsonReader reader, ModelReaderWriterOptions options) => throw null;

        protected virtual DatetimeProperty JsonModelCreateCore(ref Utf8JsonReader reader, ModelReaderWriterOptions options) => throw null;

        BinaryData IPersistableModel<DatetimeProperty>.Write(ModelReaderWriterOptions options) => throw null;

        protected virtual BinaryData PersistableModelWriteCore(ModelReaderWriterOptions options) => throw null;

        DatetimeProperty IPersistableModel<DatetimeProperty>.Create(BinaryData data, ModelReaderWriterOptions options) => throw null;

        protected virtual DatetimeProperty PersistableModelCreateCore(BinaryData data, ModelReaderWriterOptions options) => throw null;

        string IPersistableModel<DatetimeProperty>.GetFormatFromOptions(ModelReaderWriterOptions options) => throw null;

        public static implicit operator BinaryContent(DatetimeProperty datetimeProperty) => throw null;

        public static explicit operator DatetimeProperty(ClientResult result) => throw null;
    }
}