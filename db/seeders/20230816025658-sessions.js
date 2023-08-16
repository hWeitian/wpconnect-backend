"use strict";
// make your seeder file
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("sessions", [
      {
        title: "Annual Meeting 2023 - Symposium 1",
        synopsis:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mattis urna mi, quis fringilla risus efficitur eu. Donec in nisl ex. Aliquam commodo venenatis tristique. Sed gravida facilisis enim. Nullam vitae tellus in leo rutrum faucibus quis sed nibh. Fusce sed bibendum urna. Duis ac ex eget odio scelerisque pulvinar. Vivamus et nulla imperdiet, eleifend nisi in, dignissim dui. Etiam placerat tempor posuere. Praesent lacinia quam et arcu consequat malesuada. Curabitur id sem eget enim ullamcorper fringilla vel at nisi. Vestibulum viverra est in ex maximus elementum. Curabitur elementum elit velit, sit amet faucibus magna ullamcorper sit amet. Mauris orci metus, lacinia quis tellus vel, suscipit ornare magna.",
        date: "2023-07-29",
        start_time: "10:00:00",
        end_time: "11:30:00",
        conference_id: 3,
        session_code: "S1",
        session_type: "Symposia",
        room_id: 7,
        discussion_duration: 5,
        presentation_duration: 10,
      },
      {
        title: "Annual Meeting 2022 - Symposium 1",
        synopsis:
          "Nunc suscipit, erat ut aliquet ultrices, nibh ipsum semper ante, sed condimentum ante odio vel ex. Duis porttitor faucibus purus vitae rhoncus. Proin efficitur justo et nibh efficitur, sit amet egestas felis egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Vestibulum porttitor tortor a egestas ultrices. Fusce eu porta diam. Suspendisse ut pulvinar dui. Praesent congue leo id imperdiet hendrerit. Nullam rutrum mollis massa, nec faucibus mauris ultricies in. Etiam posuere erat at iaculis sodales. Integer in sem elementum tellus commodo sollicitudin. Sed vel ante sagittis, tempor nunc sit amet, suscipit neque.",
        date: "2022-07-25",
        start_time: "09:00:00",
        end_time: "10:30:00",
        conference_id: 2,
        session_code: "S1",
        session_type: "Symposia",
        room_id: 5,
        discussion_duration: 2,
        presentation_duration: 8,
      },
      {
        title: "Annual Meeting 2021 - Masterclass 1",
        synopsis:
          "Nunc suscipit, erat ut aliquet ultrices, nibh ipsum semper ante, sed condimentum ante odio vel ex. Duis porttitor faucibus purus vitae rhoncus. Proin efficitur justo et nibh efficitur, sit amet egestas felis egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Vestibulum porttitor tortor a egestas ultrices. Fusce eu porta diam. Suspendisse ut pulvinar dui. Praesent congue leo id imperdiet hendrerit. Nullam rutrum mollis massa, nec faucibus mauris ultricies in. Etiam posuere erat at iaculis sodales. Integer in sem elementum tellus commodo sollicitudin. Sed vel ante sagittis, tempor nunc sit amet, suscipit neque.",
        date: "2021-07-22",
        start_time: "10:00:00",
        end_time: "11:30:00",
        conference_id: 1,
        session_code: "MC1",
        session_type: "Masterclass",
        room_id: 1,
        discussion_duration: 2,
        presentation_duration: 8,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sessions", null, {});
  },
};
