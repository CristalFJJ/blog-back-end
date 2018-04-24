/* ==================== http类的状态码(start) ================= */
    ClientKeep: {
        code: 100,
        msg: '客户端可以继续'
    },
    ServiceUpgrade: {
        code: 101,
        msg: '指示服务器正根据 Upgrade 头切换协议'
    },
    Success: {
        code: 200,
        msg: '请求成功'
    },
    S_CreateResoure: {
        code: 201,
        msg: '请求成功并在服务器上创建了一个新资源'
    },
    S_HandlerNoneFinish: {
        code: 202,
        msg: '已接受请求进行处理但处理尚未完成'
    },
    S_MetaNoFromServer: {
        code: 203,
        msg: '客户端呈现的元信息并不源自服务器'
    },
    S_NoneReturnNewMsg: {
        code: 204,
        msg: '请求成功但没有返回新信息'
    },
    S_ProxyResetSendView: {
        code: 205,
        msg: '代理应该重置导致请求被发送的文档视图'
    },
    S_ServerFinishedGet: {
        code: 206,
        msg: '服务器已完成对资源的部分 GET 请求'
    },
    ResourceHasPosition: {
        code: 300,
        msg: '请求的资源对应于表示形式集合中的某种表示形式，每种表示形式都有自己的特定位置'
    },
    ResourceLongTimeMove: {
        code: 301,
        msg: '已经将资源永久地移动到了某个新位置，并且将来的引用应将新 URI 用于其请求'
    },
    ResourcePauseMove: {
        code: 302,
        msg: '已经将资源暂时地移动到了另一个位置，但将来的引用仍应使用原来的 URI 访问该资源，保留此定义是为了向后兼容，SC_FOUND 现在是首选定义'
    },
    ResourceOhterRespone: {
        code: 303,
        msg: '可在另一个 URI 之下找到该请求的响应'
    },
    ResourceExisted: {
        code: 304,
        msg: '资源已存在，GET 操作发现资源可用但不可修改'
    },
    ResourceNeedUseProxy: {
        code: 305,
        msg: '必须通过 Location 字段给定的代理访问请求资源'
    },
    ResourceExistOtherURI: {
        code: 307,
        msg: '请求的资源暂时驻留在另一个 URI 之下。临时 URI 应该 通过响应中的 Location 字段提供'
    },
    RequestParamError: {
        code: 400,
        msg: '客户端发送的请求在语法上不正确'
    },
    RequestHttpValidError: {
        code: 401,
        msg: '请求需要进行 HTTP 验证'
    },
    RequestBpFieldError: {
        code: 402,
        msg: '保留此代码以备将来使用'
    },
    RequestRejectError: {
        code: 403,
        msg: '服务器理解请求但拒绝完成它'
    },
    RequestError: {
        code: 404,
        msg: '请求错误'
    },
    RequestSupportURIError: {
        code: 405,
        msg: 'Request-Line 中指定的方法不支持 Request-URI 标识的资源'
    },
    RequestAcceptError: {
        code: 406,
        msg: '请求标识的资源只能生成响应实体，根据请求中发送的 accept 头，这些响应实体具有不可接受的内容特征'
    },
    RequestProxyValidError: {
        code: 407,
        msg: '客户端必须首先通过代理验证其自身'
    },
    RequestTimeOutError: {
        code: 408,
        msg: '客户端没有在服务器准备等待的时间内生成请求'
    },
    RequestResourceError: {
        code: 409,
        msg: '由于与当前资源状态冲突请求无法完成'
    },
    RequestAddressError: {
        code: 410,
        msg: '资源在服务器上不再可用并且不知道转发地址，应该认为此条件是永久性的'
    },
    RequestContentError: {
        code: 411,
        msg: '在没有定义 Content-Length 的情况下无法处理请求'
    },
    RequestFieldError: {
        code: 412,
        msg: '在服务器上测试一个或多个请求头字段中给出的前提时，该前提被求值为 false'
    },
    RequestModelError: {
        code: 413,
        msg: '因为请求实体大于服务器愿意或能够处理的实体，所以服务器拒绝处理请求'
    },
    RequestURILengthError: {
        code: 414,
        msg: '因为 Request-URI 的长度大于服务器愿意解释的 Request-URI 长度，所以服务器拒绝为请求提供服务'
    },
    RequestModelFormatError: {
        code: 415,
        msg: '因为请求实体的格式不受请求方法的请求资源支持，所以服务器拒绝为请求提供服务'
    },
    RequestByteSizeError: {
        code: 416,
        msg: '服务器无法服务于请求的字节范围'
    },
    ServerError: {
        code: 500,
        msg: '服务器错误'
    },
    ServerRequestError: {
        code: 501,
        msg: 'HTTP 服务器不支持完成请求所需的功能'
    },
    ServerProxyError: {
        code: 502,
        msg: 'HTTP 服务器在充当代理或网关时从它参考的服务器接收到一个无效响应'
    },
    ServerResponeError: {
        code: 503,
        msg: 'HTTP 服务器暂时过载，并且无法处理请求'
    },
    ServerUnderError: {
        code: 504,
        msg: '服务器在充当网关或代理时没有从上游服务器接收到及时的响应'
    },
    ServerRejectError: {
        code: 505,
        msg: '服务器不支持或拒绝支持请求消息中使用的 HTTP 协议版本'
    },
    /* ==================== http类的状态码(end) ================= */

    /* =========== 参数类的状态码, 以 1000 开始(start) ============ */
    ParamError: {
        code: 1000,
        msg: '参数错误'
    },
    ParamError_Password: {
        code: 1001,
        msg: '密码错误'
    },
    ParamError_Username: {
        code: 1002,
        msg: '用户名错误'
    },
    ParamError_ValidCode: {
        code: 1003,
        msg: '验证码错误'
    },
    ParamError_Format: {
        code: 1003,
        msg: '参数格式不正确'
    },
    /* =================== 参数类的状态码(end) ================ */

    /* ======== 逻辑业务类的状态码, 以 2000 开始(start) ========= */
    BusinessError: {
        code: 2000,
        msg: '业务处理时出错'
    },
    /* ================= 逻辑业务类的状态码(end) ================ */

    /* ========== 数据库类的状态码, 以 3000 开始(start) ========= */
    DataBaseError: {
        code: 3000,
        msg: '数据库出错'
    },
    /* ================ 数据库类的状态码(end) =============== */

    /* ========== 其他类的状态码, 以 4000 开始(start) ========= */
    OtherError: {
        code: 4000,
        msg: '未知错误'
    }
/* ================ 其他类的状态码(end) =============== */