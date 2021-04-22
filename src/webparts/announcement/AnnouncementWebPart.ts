import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  PropertyPaneSlider,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AnnouncementWebPartStrings';
import Announcement from './components/Announcement';
import { IAnnouncementProps } from './components/IAnnouncementProps';
import {sp} from "@pnp/sp/presets/all";

export interface IAnnouncementWebPartProps {
  description: string;
  listName: string;
  postPerPage: number;
}

export default class AnnouncementWebPart extends BaseClientSideWebPart<IAnnouncementWebPartProps> {
  // private _allLists = async () => {return await sp.web.lists.get()}
  private lists: IPropertyPaneDropdownOption[] = [{
    key: 'Announcement',
    text: 'Announcement'
  },
  {
    key: 'Announcement1',
    text: 'Announcement1'
  }];
  private listsDropdownDisabled: boolean = false;

  // private validateDescription(value: string): string {
  //   this._allLists().then((list)=>{console.log(list,"mmm")})
  //   if (value === null ||
  //     value.trim().length === 0) {
  //     return 'Provide a description';
  //   }

  //   if (value.length > 40) {
  //     return 'Description should not be longer than 40 characters';
  //   }

  //   return '';
  // }

  public render(): void {
    const element: React.ReactElement<IAnnouncementProps> = React.createElement(
      Announcement,
      {
        description: this.properties.description,
        spContext: this.context,
        listName: this.properties.listName,
        postPerPage: this.properties.postPerPage,
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
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                  // onGetErrorMessage: this.validateDescription.bind(this)

                }),
                PropertyPaneDropdown('listName', {
                  label: strings.ListNameFieldLabel,
                  options: this.lists,
                  disabled: this.listsDropdownDisabled,
                  selectedKey: 'Announcement',

                }),
                PropertyPaneSlider('postPerPage', {
                  label: 'postPerPage',
                  min:2,  
                  max:10,  
                  value:3,  
                  showValue:true,  
                  step:1                
                  }),

              ]
            }
          ]
        }
      ]
    };
  }
}
