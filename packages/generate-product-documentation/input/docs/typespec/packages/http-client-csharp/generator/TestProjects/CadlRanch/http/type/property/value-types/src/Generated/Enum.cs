// <auto-generated/>

#nullable disable

using System.ClientModel;
using System.ClientModel.Primitives;
using System.Threading;
using System.Threading.Tasks;
using _Type.Property.ValueTypes.Models;

namespace _Type.Property.ValueTypes
{
    public partial class Enum
    {
        protected Enum() => throw null;

        public ClientPipeline Pipeline => throw null;

        public virtual ClientResult Get(RequestOptions options) => throw null;

        public virtual Task<ClientResult> GetAsync(RequestOptions options) => throw null;

        public virtual ClientResult<EnumProperty> Get(CancellationToken cancellationToken = default) => throw null;

        public virtual Task<ClientResult<EnumProperty>> GetAsync(CancellationToken cancellationToken = default) => throw null;

        public virtual ClientResult Put(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> PutAsync(BinaryContent content, RequestOptions options = null) => throw null;

        public virtual ClientResult Put(EnumProperty body, CancellationToken cancellationToken = default) => throw null;

        public virtual Task<ClientResult> PutAsync(EnumProperty body, CancellationToken cancellationToken = default) => throw null;
    }
}