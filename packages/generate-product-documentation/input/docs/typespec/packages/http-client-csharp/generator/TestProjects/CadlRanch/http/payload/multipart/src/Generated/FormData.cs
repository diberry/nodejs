// <auto-generated/>

#nullable disable

using System.ClientModel;
using System.ClientModel.Primitives;
using System.Threading.Tasks;

namespace Payload.MultiPart
{
    public partial class FormData
    {
        protected FormData() => throw null;

        public ClientPipeline Pipeline => throw null;

        public virtual ClientResult Basic(BinaryContent content, string contentType, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> BasicAsync(BinaryContent content, string contentType, RequestOptions options = null) => throw null;

        public virtual ClientResult FileArrayAndBasic(BinaryContent content, string contentType, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> FileArrayAndBasicAsync(BinaryContent content, string contentType, RequestOptions options = null) => throw null;

        public virtual ClientResult JsonPart(BinaryContent content, string contentType, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> JsonPartAsync(BinaryContent content, string contentType, RequestOptions options = null) => throw null;

        public virtual ClientResult BinaryArrayParts(BinaryContent content, string contentType, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> BinaryArrayPartsAsync(BinaryContent content, string contentType, RequestOptions options = null) => throw null;

        public virtual ClientResult MultiBinaryParts(BinaryContent content, string contentType, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> MultiBinaryPartsAsync(BinaryContent content, string contentType, RequestOptions options = null) => throw null;

        public virtual ClientResult CheckFileNameAndContentType(BinaryContent content, string contentType, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> CheckFileNameAndContentTypeAsync(BinaryContent content, string contentType, RequestOptions options = null) => throw null;

        public virtual ClientResult AnonymousModel(BinaryContent content, string contentType, RequestOptions options = null) => throw null;

        public virtual Task<ClientResult> AnonymousModelAsync(BinaryContent content, string contentType, RequestOptions options = null) => throw null;

        public virtual FormDataHttpParts GetFormDataHttpPartsClient() => throw null;
    }
}