//
//  CallDirectoryHandler.swift
//  CallBlockerExtension
//
//  iOS Call Directory Extension Handler
//

import Foundation
import CallKit

class CallDirectoryHandler: CXCallDirectoryProvider {
    
    override func beginRequest(with context: CXCallDirectoryExtensionContext) {
        context.delegate = self
        
        // Check if this is an incremental load or a full reload
        if context.isIncremental {
            addOrRemoveIncrementalBlockingPhoneNumbers(to: context)
        } else {
            addAllBlockingPhoneNumbers(to: context)
        }
        
        context.completeRequest()
    }
    
    private func addAllBlockingPhoneNumbers(to context: CXCallDirectoryExtensionContext) {
        // Retrieve blocked numbers from shared storage
        let blockedNumbers = retrieveBlockedNumbers()
        
        // Add all blocked numbers to the context
        for number in blockedNumbers.sorted() {
            context.addBlockingEntry(withNextSequentialPhoneNumber: number)
        }
    }
    
    private func addOrRemoveIncrementalBlockingPhoneNumbers(to context: CXCallDirectoryExtensionContext) {
        // Perform incremental update if supported
        addAllBlockingPhoneNumbers(to: context)
    }
    
    private func retrieveBlockedNumbers() -> [CXCallDirectoryPhoneNumber] {
        var numbers: [CXCallDirectoryPhoneNumber] = []
        
        // Access shared UserDefaults using App Group
        if let sharedDefaults = UserDefaults(suiteName: "group.com.callblocker.shared") {
            
            // Get individual blocked numbers
            if let blockedData = sharedDefaults.data(forKey: "blocked_numbers"),
               let blockedNumbers = try? JSONDecoder().decode([BlockedNumber].self, from: blockedData) {
                for item in blockedNumbers {
                    if let phoneNumber = parsePhoneNumber(item.number) {
                        numbers.append(phoneNumber)
                    }
                }
            }
            
            // Get numbers from block lists
            if let listsData = sharedDefaults.data(forKey: "block_lists"),
               let lists = try? JSONDecoder().decode([BlockList].self, from: listsData) {
                for list in lists {
                    for number in list.numbers {
                        if let phoneNumber = parsePhoneNumber(number) {
                            numbers.append(phoneNumber)
                        }
                    }
                }
            }
            
            // Get all numbers and filter by regex patterns
            if let regexData = sharedDefaults.data(forKey: "regex_patterns"),
               let patterns = try? JSONDecoder().decode([RegexPattern].self, from: regexData) {
                
                let enabledPatterns = patterns.filter { $0.enabled }
                // Note: Regex filtering would need access to all possible numbers
                // For now, this is a placeholder - regex matching is complex in Call Directory
            }
        }
        
        // Remove duplicates and return sorted array
        return Array(Set(numbers)).sorted()
    }
    
    private func parsePhoneNumber(_ number: String) -> CXCallDirectoryPhoneNumber? {
        // Remove non-digit characters
        let cleaned = number.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
        return CXCallDirectoryPhoneNumber(cleaned)
    }
}

extension CallDirectoryHandler: CXCallDirectoryExtensionContextDelegate {
    
    func requestFailed(for extensionContext: CXCallDirectoryExtensionContext, withError error: Error) {
        // Handle error
        print("Call Directory Extension failed: \(error.localizedDescription)")
    }
}

// MARK: - Data Models

struct BlockedNumber: Codable {
    let id: String
    let number: String
    let label: String?
    let addedAt: Int64
}

struct BlockList: Codable {
    let id: String
    let name: String
    let numbers: [String]
    let createdAt: Int64
}

struct RegexPattern: Codable {
    let id: String
    let pattern: String
    let description: String
    let enabled: Bool
    let createdAt: Int64
}