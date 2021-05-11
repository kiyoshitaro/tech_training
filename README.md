# Assignment
Provision modern site with **PnP Site Core**.

## Requirements:
- The modern site should contain the following components:

1. a **home page** with spfx webparts developed in homework [SPFx20210226](https://git.avepoint.net/interntraining-vietnam/spfx20210226).

2. **list\library** created as data provider for webparts.

3. a **custom logo** set for the site.

- The components above should be **configurable** in a xml format, you can refer to the sample code.

- All the components above must be deployed **automatically** without any manual operation.


## Tips:
- **You need to**

1. Try to understand how the tool works. there are some concepts about reflection and XML Serialization, You can refer to https://docs.microsoft.com/en-us/dotnet/framework/reflection-and-codedom/reflection and https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/serialization/how-to-read-object-data-from-an-xml-file

2. The sample code here is only to deploy site column to the specified site, try to run the sample code sucessfully first.

3. Find the proper APIs in PnP Site Core.

4. Dive into PnP Site Core API Test to learn how to use these APIs.

5. Adding or updating lists/columns is necessary, if you have enough time, you need to complete to add items using xml.

- **Don't forget to**

1. Add proper exception handlers.

2. Add logs to audit all the operations and exceptions.



