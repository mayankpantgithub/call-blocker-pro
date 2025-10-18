//
//  RNCallBlocker.swift
//  CallBlocker
//
//  React Native Native Module for Call Blocker
//

import Foundation
import CallKit
import React

@objc(RNCallBlocker)
class RNCallBlocker: NSObject {
    
    @objc
    func reloadExtension(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        // Get the extension identifier from Info.plist
        guard let identifier = Bundle.main.object(forInfoDictionaryKey: "CallDirectoryExtensionIdentifier") as? String else {
            reject("ERROR", "Extension identifier not found", nil)
            return
        }
        
        CXCallDirectoryManager.sharedInstance.reloadExtension(withIdentifier: identifier) { error in
            if let error = error {
                reject("ERROR", error.localizedDescription, error)
            } else {
                resolve("Extension reloaded successfully")
            }
        }
    }
    
    @objc
    func syncDataToExtension(_ data: [String: Any], resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        // Access shared UserDefaults
        guard let sharedDefaults = UserDefaults(suiteName: "group.com.callblocker.shared") else {
            reject("ERROR", "Could not access shared storage", nil)
            return
        }
        
        // Store data in shared UserDefaults
        if let blockedNumbers = data["blocked_numbers"] as? String {
            sharedDefaults.set(blockedNumbers, forKey: "blocked_numbers")
        }
        
        if let blockLists = data["block_lists"] as? String {
            sharedDefaults.set(blockLists, forKey: "block_lists")
        }
        
        if let regexPatterns = data["regex_patterns"] as? String {
            sharedDefaults.set(regexPatterns, forKey: "regex_patterns")
        }
        
        sharedDefaults.synchronize()
        resolve("Data synced successfully")
    }
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
}

// MARK: - React Native Bridge

@objc(RNCallBlockerBridge)
class RNCallBlockerBridge: NSObject {
    
    @objc
    static func moduleName() -> String! {
        return "RNCallBlocker"
    }
}