// <auto-generated/>

#nullable disable

using System.ClientModel;
using System.ClientModel.Primitives;
using System.Threading;
using System.Threading.Tasks;
using _Type.Union.Models;

namespace _Type.Union
{
    public partial class StringAndArray
    {
        protected StringAndArray() => throw null;

        public ClientPipeline Pipeline => throw null;

        public virtual ClientResult Get(RequestOptions options) => throw null;

        public virtual Task<ClientResult> GetAsync(RequestOptions options) => throw null;

        public virtual ClientResult<GetResponse2> Get(CancellationToken cancellationToken = default) => throw null;

        public virtual Task<ClientResult<GetResponse2>> GetAsync(CancellationToken cancellationToken = default) => throw null;

        public virtual ClientResult Send(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> SendAsync(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual ClientResult Send(StringAndArrayCases prop, CancellationToken cancellationToken = default) => throw null;

        public virtual Task<ClientResult> SendAsync(StringAndArrayCases prop, CancellationToken cancellationToken = default) => throw null;
    }
}