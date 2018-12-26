package ir.geeglo.dev.store.admin.rest;

import ir.piana.dev.core.annotation.AssetHandler;
import ir.piana.dev.core.annotation.Handler;
import ir.piana.dev.core.annotation.HandlerType;

/**
 * @author Mohammad Rahmati, 10/13/2018
 */
@Handler(baseUrl = "/", handlerType = HandlerType.ASSET_HANDLER)
//@AssetHandler(assetPath = "admin-client/src")
@AssetHandler(assetPath = "admin-client/dist/store-client")
public class RootAssetHandler {
}
