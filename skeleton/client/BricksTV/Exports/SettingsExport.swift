//
//  AppDelegate.swift
//  OK TV
//
//  20steps Digital Full Service Boutique
//
//  Developers: hhva@20steps.de
//
//  Klambt / OK!
//

import UIKit
import TVMLKit

@objc protocol SettingsExportProtocol : JSExport {
    func getItem(key:String) -> String?
    
    func setItem(key:String, data:String)
}

class SettingsExport: NSObject, SettingsExportProtocol {

    func getItem(key: String) -> String? {
        
        return "String value"
    }
    
    func setItem(key: String, data: String) {
            print("Set key:\(key) value:\(data)")
    }
}
