// <auto-generated/>

#nullable disable

using System.ClientModel;
using System.ClientModel.Primitives;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace _Type.Dictionary
{
    public partial class BooleanValue
    {
        protected BooleanValue() => throw null;

        public ClientPipeline Pipeline => throw null;

        public virtual ClientResult Get(RequestOptions options) => throw null;

        public virtual Task<ClientResult> GetAsync(RequestOptions options) => throw null;

        public virtual ClientResult<IDictionary<string, bool>> Get(CancellationToken cancellationToken = default) => throw null;

        public virtual Task<ClientResult<IDictionary<string, bool>>> GetAsync(CancellationToken cancellationToken = default) => throw null;

        public virtual ClientResult Put(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> PutAsync(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual ClientResult Put(IDictionary<string, bool> body, CancellationToken cancellationToken = default) => throw null;

        public virtual Task<ClientResult> PutAsync(IDictionary<string, bool> body, CancellationToken cancellationToken = default) => throw null;
    }
}