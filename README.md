# videosdk-custom-recording-template-react-example

- VideoSDK provides Recording / Live Streaming / HLS layout, to be customizable as per your App UI.

- By default the Recording / Live Streaming / HLS, will be using the Prebuit SDK for the layout. But if you want to customize the layout you can design you own web application which uses is built upon VideoSDK client SDK.

- After developing you layout and hosting to an server having SSL enabled, you can pass the hosted url inside `templateUrl`, while starting Recording / Live Streaming / HLS.

- This is the example project for customizing recording template. A basic implementation only, you can add your styles and components according to your project UI.

- By providing the hosted url as a `templateUrl` while starting Recording / Live Streaming / HLS, our servers will use that hosted webpage for recording the meeting.

- This example show how you can implement the template after hosting which parameters for url, you will be needed to pass inside the `templateUrl`.

## How Recording / Live Streaming / HLS works?

- VideoSDK recorder server will open a webpage and join the meeting by providing the meeting join configurations inside the url query parameters. And then record the whole web page screen and save recorded files into our server.

- VideoSDK server will know the the recorder is joined as a participant in the meeting and will not show that participant to other joined participant in the same meeting session.

### Step 1 : Creating Template URL

- After building the project and hosting it to the SSL enaled web server, which for example might be https://www.example.com/recording-template.

- As the current example project is configured in that way that it will accept meetingId, token and participant from url search params.

- Now we will create `templateUrl` by passing valid `token` and `meetingId` as query params.

**NOTE** : You can pass N number of query parameters as per your requirements.

- We will not provide participantId while generating `templateUrl` as VideoSDK server will add participantId as a query search parameter.

- `templateUrl` will look like this :

**`https://www.example.com/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.l0sImlhdCI6MTY0OTkyNjI1MCwiZXhwIjoxNjwNTMxMDUwf&meetingId=74v5-v21l-n1ey`**

### Step 2 : Pass `templateUrl` to Video SDK Server using API

- Now we will add this `templateUrl` to the body of the [StartRecording](/api-reference/realtime-communication/start-recording) API.

- Here, we took the [Recording](/api-reference/realtime-communication/start-recording) API example, if you want go with [Livestream](/api-reference/realtime-communication/start-livestream) or [Hls](/api-reference/realtime-communication/start-hlsStream) the same steps will be consider.

```js
const startRecording = () => {
    const roomId = "your_meeting_id"
    const SDK_TOKEN = "your_sdk_token"
    const API_TOKEN = "your_api_token"

    const options = {
      method: "POST",
      headers: {
        Authorization:API_TOKEN,
        "Content-Type": "application/json",
      },
      body: {
        roomId: roomId,
        // Add templateUrl here
        templateUrl:
          `https://www.example.com/?token=$${SDK_TOKEN}&meetingId=${roomId}`,
      },
    };

    const url = `https://api.videosdk.live/v2/recordings/start`;
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);
}
```

After successfully calling API, the Video SDK server will concate `templateUrl` with recorder `participanId` and pass it to Video SDK Composer.

![template-url-flow](/assets/template_url_flow.png)

**templateUrl after concating will look like this :**

`https://www.example.com/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.l0sImlhdCI6MTY0OTkyNjI1MCwiZXhwIjoxNjwNTMxMDUwf&meetingId=74v5-v21l-n1ey&participantId=RECORDER_ID`
