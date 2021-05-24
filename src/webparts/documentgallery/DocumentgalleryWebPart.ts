import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DocumentgalleryWebPartStrings';
import Documentgallery from './components/Documentgallery';
import { IDocumentgalleryProps } from './components/IDocumentgalleryProps';
import { sp } from "@pnp/sp/presets/all";

export interface IDocumentgalleryWebPartProps {
  description: string;
  listName: string;
}

export default class DocumentgalleryWebPart extends BaseClientSideWebPart<IDocumentgalleryWebPartProps> {
  private loadLibs = async () => {return await sp.web.folders.get();};
  private listsDropdownDisabled: boolean = false;
  private lists: IPropertyPaneDropdownOption[];

  protected onPropertyPaneConfigurationStart(): void {
    this.listsDropdownDisabled = !this.lists;

    if (this.lists) {
      return;
    }

    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'lists');

    this.loadLibs()
      .then((listOptions)=> {
        this.lists = listOptions.filter((ls)=>{return ls.Name.indexOf("_") == -1;}).map((ls) => {return {
          key: ls.Name,
          text: ls.Name,
        }; });
        this.listsDropdownDisabled = false;
        this.context.propertyPane.refresh();
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        this.render();
      });
  }

  public render(): void {
    const element: React.ReactElement<IDocumentgalleryProps> = React.createElement(
      Documentgallery,
      {
        description: this.properties.description,
        spContext: this.context,
        listName: this.properties.listName,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
  
  // click Apply button and render webpart again
  protected onAfterPropertyPaneChangesApplied(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
    this.render();
  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('listName', {
                  label: strings.LibNameFieldLabel,
                  options: this.lists,
                  disabled: this.listsDropdownDisabled,
                  selectedKey: 'Shared Documents'
                }),

              ]
            }
          ]
        }
      ]
    };
  }
}
