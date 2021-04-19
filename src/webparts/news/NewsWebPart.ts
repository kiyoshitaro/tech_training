import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'NewsWebPartStrings';
import News from './components/News';
import { INewsProps } from './components/INewsProps';

export interface INewsWebPartProps {
  description: string;
  listName: string;
}

export default class NewsWebPart extends BaseClientSideWebPart<INewsWebPartProps> {
  private lists: IPropertyPaneDropdownOption[] = [{
    key: 'Announcement',
    text: 'Announcement'
  },
  {
    key: 'News',
    text: 'News'
  }];
  private listsDropdownDisabled: boolean = false;


  public render(): void {
    const element: React.ReactElement<INewsProps> = React.createElement(
      News,
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
