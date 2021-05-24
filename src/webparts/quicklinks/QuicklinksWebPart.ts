import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown

} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'QuicklinksWebPartStrings';
import Quicklinks from './components/Quicklinks';
import { IQuicklinksProps } from './components/IQuicklinksProps';
import {sp} from "@pnp/sp/presets/all";

export interface IQuicklinksWebPartProps {
  description: string;
  listName: string;
}

export default class QuicklinksWebPart extends BaseClientSideWebPart<IQuicklinksWebPartProps> {
  private loadLists = async () => {return await sp.web.lists.get();};
  private listsDropdownDisabled: boolean = false;
  private lists: IPropertyPaneDropdownOption[];

  protected onPropertyPaneConfigurationStart(): void {
    this.listsDropdownDisabled = !this.lists;

    if (this.lists) {
      return;
    }

    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'lists');

    this.loadLists()
      .then((listOptions)=> {
        this.lists = listOptions.filter((ls)=>{return ls.EntityTypeName.indexOf("List") != -1;}).map((ls) => {return {
          key: ls.Title,
          text: ls.Title,
        }; });
        this.listsDropdownDisabled = false;
        this.context.propertyPane.refresh();
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        this.render();
      });
  }
    // private lists: IPropertyPaneDropdownOption[] = [
    //   {key: "Quicklinks",text:"Quicklinks"},
    //   {key: "Quicklinks1",text:"Quicklinks1"},
    //   {key: "Quicklinks2",text:"Quicklinks2"},
    // ];

  public render(): void {
    const element: React.ReactElement<IQuicklinksProps> = React.createElement(
      Quicklinks,
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
                PropertyPaneDropdown('listName', {
                  label: strings.ListNameFieldLabel,
                  options: this.lists,
                  disabled: this.listsDropdownDisabled,
                  selectedKey: 'Quicklinks',
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
