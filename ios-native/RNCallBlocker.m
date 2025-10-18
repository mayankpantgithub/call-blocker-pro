#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNCallBlocker, NSObject)

RCT_EXTERN_METHOD(reloadExtension:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(syncDataToExtension:(NSDictionary *)data
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end