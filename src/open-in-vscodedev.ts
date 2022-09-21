import { SourceItemContext } from "TFS/VersionControl/UIContracts";

class OpenInVsCodeDev {
    public static execute(actionContext: SourceItemContext) {
        if (actionContext.item.sourceProvider !== "Git") {
            alert(`Unsupported sourceProvider: ${actionContext.item.sourceProvider}!`);
        }

        const vssContext = VSS.getWebContext();
        const organization = vssContext.collection.name;
        const project = vssContext.project.name;
        const repo = actionContext.gitRepository.name;

        const path = actionContext.item.isFolder ? null : actionContext.item.path;

        let url = `https://vscode.dev/azurerepos/${organization}/${project}/${repo}`;
        const urlParams = new URLSearchParams();
        // @ts-ignore - This bears the version of the specific item (branch, commit)
        urlParams.set("version", actionContext.item.item.version);
        if (path) {
            urlParams.set("path", path);
        }
        if ([...urlParams.entries()].length > 0) {
            url += `?${urlParams.toString()}`;
        }

        window.open(url, '_blank');
    }
}

VSS.init({});

var openInVsCodeDevHandler = (function () {
    "use strict";
    return {
        // This is a callback that gets invoked when a user selects the newly contributed menu item
        // The actionContext parameter contains context data surrounding the circumstances of this
        // action getting invoked.
        execute: function (actionContext: SourceItemContext) {
            return OpenInVsCodeDev.execute(actionContext);
        }
    };
}());

VSS.register("open-in-vscodedev", openInVsCodeDevHandler);
// VSS.notifyLoadSucceeded();