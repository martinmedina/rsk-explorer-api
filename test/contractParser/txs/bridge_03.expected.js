
import { result as tx } from './bridge_03.json'

export default {
  tx,
  expect: {
    events: [
      {
        event: 'add_signature_topic',
        args: {
          0: '0x0694214d9840d726295bb2ae95069206c548135ea7a9105007fc29a6fecfaeeb',
          1: '0xa7253969eef8d9ac3c0b3bc15bd2f5938c43a485',
          2: '0xff489748fc875d5962d614ae7bb03521d6ed25e24a15ea1b1c4c8939dcdea70b'
        }
      },
      {
        event: 'release_btc_topic',
        args: {
          0: '0x66306564303334333334666639326566396262643034376134383964396666323664383135336162363037386362643562386363316162346663623737386132',
          1: '0x01000000019af861e2c831fa598ddff225ab6fc69a528362ae6690ae2c9cef62ae4f0baaaa00000000fd490400483045022100d71819afecec372bedced0eac6b18017a69d6280e94a0c71d03432877a6326e7022054c12ca2d478fd0f290573f5f8934ac0cf424e7c383b45ede7c87b30bf918eb601473044022038877ff04e7ad78618c8e87921a2af3ca2af45703b6b749263cb64f162ca1eca02206198ab6761cbf7a7c98973dd7a43e41b626b63d09ebb30b0a38a4e8bfd970c900147304402203605c90815b15b5b3b01600460cac612645dffc9578260e328dc5b9161bf12fa022003f3c8b51f43ef0062bc3239e22e704680e55df0c8006a6f2f2a6f21db88a8e70147304402205ae84107e12cc4963509ffef1f25177f3e004d970f42bbfc7b8e04f1d3fba0b302205d9a0ebf0d5daf3cee6b8ad601274a8ea1c2fa1b34d959e6567c8f87e55df22601483045022100c8867bfc0f1ef4153b3b17ec2d9b6c1662bce7f6b0dc72bb92d60ebbb39d3d8402206c5f69875cb688973a88d194ae4e7142dc02170cac8ef3874a1d5d2c1b4f255e01483045022100a9b19a387eced85308ca36f77dbca2add2c361ef1ca199f31857e04ec447e940022058e007861a5a985558eb98b2b93e95b5e99d1138f7b1b4b1470f6a8726939b6d0147304402201951ea00cb063a39341f7f8527e85c80983f356e548729bf33547d3b3955ece70220537d7a3dc4a5ab1a40b5c9c610f37f467f7409cc1b55e7f41e713d92a13cf30001483045022100b292f17e74e462f9fa951fc4084bd6b636ec28bffb06ed465369dc29a7b4ab8c02207f1d05d572f6e486fc5b0eb71f061e7fb423d56e88a385963e7d8ab96c0a634c014d010258210245ef34f5ee218005c9c21227133e8568a4f3f11aeab919c66ff7b816ae1ffeea21024cd9f00935993695af7e6c35165550a79eeac9fdfe95df83c5fdd8692ba2ef9e21027319afb15481dbeb3c426bcc37f9a30e7f51ceff586936d85548d9395bcc2344210294c817150f78607566e961b3c71df53a22022a80acbb982f83c0c8baac040adc2102ac1901b6fba2c1dbd47d894d2bd76c8ba1d296d65f6ab47f1c6b22afb53e73eb2102c6018fcbd3e89f3cf9c7f48b3232ea3638eb8bf217e59ee290f5f0cfb2fb925921031aabbeb9b27258f98c2bf21f36677ae7bae09eb2d8c958ef41a20a6e88626d262103250c11be0561b1d7ae168b1f59e39cbc1fd1ba3cf4d2140c1a365b2723a2bf93210340df69f28d69eef60845da7d81ff60a9060d4da35c767f017b0dd4e20448fb44210372cd46831f3b6afd4c044d160b7667e8ebf659d6cb51a825a3104df6ee0638c62103ae72827d25030818c4947a800187b1fbcc33ae751e248ae60094cc989fb880f62103b53899c390573471ba30e5054f78376c5f797fda26dde7a760789f02908cbad22103b65cd7c22e70c0823882c6e71ac2c279ed31cbe29cb4a1c00572ce539c0c45732103d789669ec532f756461d3d6d83b316ed0c4272d48dc3b60cce0f494e9a09d3e72103ecd8af1e93c57a1b8c7f917bd9980af798adeb0205e9687865673353eb041e8d5faeffffffff011e54f505000000001976a914291d929bf6eddb819d7e3afcbcf6ec699b58c5ec88ac00000000'
        }

      }
    ]
  }
}