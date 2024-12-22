// <auto-generated/>

#nullable disable

using System.ClientModel;
using System.ClientModel.Primitives;
using System.Threading;
using System.Threading.Tasks;
using _Type.Property.Optional.Models;

namespace _Type.Property.Optional
{
    public partial class RequiredAndOptional
    {
        protected RequiredAndOptional() => throw null;

        public ClientPipeline Pipeline => throw null;

        public virtual ClientResult GetAll(RequestOptions options) => throw null;

        public virtual Task<ClientResult> GetAllAsync(RequestOptions options) => throw null;

        public virtual ClientResult<RequiredAndOptionalProperty> GetAll(CancellationToken cancellationToken = default) => throw null;

        public virtual Task<ClientResult<RequiredAndOptionalProperty>> GetAllAsync(CancellationToken cancellationToken = default) => throw null;

        public virtual ClientResult GetRequiredOnly(RequestOptions options) => throw null;

        public virtual Task<ClientResult> GetRequiredOnlyAsync(RequestOptions options) => throw null;

        public virtual ClientResult<RequiredAndOptionalProperty> GetRequiredOnly(CancellationToken cancellationToken = default) => throw null;

        public virtual Task<ClientResult<RequiredAndOptionalProperty>> GetRequiredOnlyAsync(CancellationToken cancellationToken = default) => throw null;

        public virtual ClientResult PutAll(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> PutAllAsync(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual ClientResult PutAll(RequiredAndOptionalProperty body, CancellationToken cancellationToken = default) => throw null;

        public virtual Task<ClientResult> PutAllAsync(RequiredAndOptionalProperty body, CancellationToken cancellationToken = default) => throw null;

        public virtual ClientResult PutRequiredOnly(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> PutRequiredOnlyAsync(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual ClientResult PutRequiredOnly(RequiredAndOptionalProperty body, CancellationToken cancellationToken = default) => throw null;

        public virtual Task<ClientResult> PutRequiredOnlyAsync(RequiredAndOptionalProperty body, CancellationToken cancellationToken = default) => throw null;
    }
}