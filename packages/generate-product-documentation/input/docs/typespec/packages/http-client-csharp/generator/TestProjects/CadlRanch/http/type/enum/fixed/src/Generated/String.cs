// <auto-generated/>

#nullable disable

using System.ClientModel;
using System.ClientModel.Primitives;
using System.Threading;
using System.Threading.Tasks;
using _Type._Enum.Fixed.Models;

namespace _Type._Enum.Fixed
{
    public partial class String
    {
        protected String() => throw null;

        public ClientPipeline Pipeline => throw null;

        public virtual ClientResult GetKnownValue(RequestOptions options) => throw null;

        public virtual Task<ClientResult> GetKnownValueAsync(RequestOptions options) => throw null;

        public virtual ClientResult<DaysOfWeekEnum> GetKnownValue(CancellationToken cancellationToken = default) => throw null;

        public virtual Task<ClientResult<DaysOfWeekEnum>> GetKnownValueAsync(CancellationToken cancellationToken = default) => throw null;

        public virtual ClientResult PutKnownValue(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> PutKnownValueAsync(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual ClientResult PutKnownValue(DaysOfWeekEnum body, CancellationToken cancellationToken = default) => throw null;

        public virtual Task<ClientResult> PutKnownValueAsync(DaysOfWeekEnum body, CancellationToken cancellationToken = default) => throw null;

        public virtual ClientResult PutUnknownValue(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> PutUnknownValueAsync(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual ClientResult PutUnknownValue(DaysOfWeekEnum body, CancellationToken cancellationToken = default) => throw null;

        public virtual Task<ClientResult> PutUnknownValueAsync(DaysOfWeekEnum body, CancellationToken cancellationToken = default) => throw null;
    }
}