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

import * as strings from 'AnnouncementWebPartStrings';
import Announcement from './components/Announcement';
import { IAnnouncementProps } from './components/IAnnouncementProps';

export interface IAnnouncementWebPartProps {
  description: string;
  listName: string;
}

export default class AnnouncementWebPart extends BaseClientSideWebPart<IAnnouncementWebPartProps> {
  private lists: IPropertyPaneDropdownOption[] = [{
    key: 'Announcement',
    text: 'Announcement'
  },
  {
    key: 'Announcement1',
    text: 'Announcement1'
  }];
  private listsDropdownDisabled: boolean = false;


  public render(): void {
    const element: React.ReactElement<IAnnouncementProps> = React.createElement(
      Announcement,
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
                  label: strings.ListNameFieldLabel,
                  options: this.lists,
                  disabled: this.listsDropdownDisabled
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
