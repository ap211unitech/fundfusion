import { tokens } from "../utils";

export const categories = [
  "Art",
  "Comic",
  "Health",
  "Technology",
  "Music",
  "Games",
];

export const campaigns = [
  {
    title: "Disk Plus: Ultra-slim Data Solution for Your Daily Tech",
    category: "Technology",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",
    image:
      "https://i.kickstarter.com/assets/046/155/467/569a3806003cd69d311dc2fb9b225a10_original.png?anim=false&fit=cover&gravity=auto&height=576&origin=ugc&q=92&width=1024&sig=r0BNKAM8fwQ5EJVdGTeZ5NWYcIts6rYMdtY3tnWWXkY%3D",
    targetAmount: tokens(10),
    targetTimestamp: Math.floor(new Date().getTime() / 1000) + 3 * 86400,
  },
  {
    title: "HUMAN REFERENCES by Kibbitzer",
    category: "Art",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image:
      "https://i.kickstarter.com/assets/046/196/139/0e1c606b50eb74128ec672d9af386ce5_original.png?anim=false&fit=cover&gravity=auto&height=576&origin=ugc&q=92&width=1024&sig=X%2BZ5ryGV%2F5TSUs8gSdQVMR8sPWCmN3NW1Q7XSRmsDj0%3D",
    targetAmount: tokens(25),
    targetTimestamp: Math.floor(new Date().getTime() / 1000) + 5 * 86400,
  },
];