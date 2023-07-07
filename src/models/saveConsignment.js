class saveConsignment {
    constructor() {
      this.BookedCcp = {
        Id: 2,
        Name: "Main",
        TerminalId: 0,
        IsMain: true,
        ContactNo: null
      };
      this._shipmentDetail = [
        {
          GoodsType: {
            TypeId: 212,
            TypeName: "Garments",
            CatagoryId: 1
          },
          Packing: {
            PackingId: 34,
            PackingName: "Pieces"
          },
          UnitQty: 1,
          UnitWeight: 1,
          DeclaredValue: 1
        }
      ];
      this.ProductBo = {
        Id: 1,
        Name: "Paid",
        IsActive: false,
        Si: 1
      };
      this.Customer = {};
      this.DestinationTerminal = {
        _ccp: [
          {
            Id: 7,
            Name: "Main",
            TerminalId: 0,
            IsMain: false,
            ContactNo: null
          },
          {
            Id: 34,
            Name: "Hamdard Chowk",
            TerminalId: 0,
            IsMain: false,
            ContactNo: null
          },
          {
            Id: 35,
            Name: "Kalma Chowk",
            TerminalId: 0,
            IsMain: false,
            ContactNo: null
          },
          {
            Id: 56,
            Name: "Lari Adda",
            TerminalId: 0,
            IsMain: false,
            ContactNo: null
          },
          {
            Id: 58,
            Name: "Flash band Road",
            TerminalId: 0,
            IsMain: false,
            ContactNo: null
          }
        ],
        Id: 1,
        Name: "Lahore",
        ShortName: "LHR"
      };
      this.DestinationCCP = {
        Id: 7,
        Name: "Main",
        TerminalId: 0,
        IsMain: true,
        ContactNo: null
      };
      this.SenderDetail = {
        Name: "mubeen",
        MobileNo: "1231231231",
        CNIC: "1231231231231",
        Address: null,
        ZipCode: null,
        Email: null
      };
      this.ReciverDetail = {
        Name: "Usman",
        MobileNo: "1231231231",
        CNIC: "1231231231231"
      };
      this.FeededBy = {
        UserId: 10
      };
      this.BookedTerminal = {
        _ccp: [
          {
            Id: 2,
            Name: "Main",
            TerminalId: 0,
            IsMain: false,
            ContactNo: null
          },
          {
            Id: 39,
            Name: "Sargodha Road",
            TerminalId: 0,
            IsMain: false,
            ContactNo: null
          },
          {
            Id: 42,
            Name: "Jhang Road",
            TerminalId: 0,
            IsMain: false,
            ContactNo: null
          },
          {
            Id: 43,
            Name: "Factory Area",
            TerminalId: 0,
            IsMain: false,
            ContactNo: null
          },
          {
            Id: 44,
            Name: "Rexcity",
            TerminalId: 0,
            IsMain: false,
            ContactNo: null
          },
          {
            Id: 45,
            Name: "Khurrin Wala",
            TerminalId: 0,
            IsMain: false,
            ContactNo: null
          },
          {
            Id: 57,
            Name: "Kohistan",
            TerminalId: 0,
            IsMain: false,
            ContactNo: null
          }
        ],
        Id: 2,
        Name: "Faisalabad",
        ShortName: "FSD"
      };
      this.Datetime = "6/23/2023 11:56:8";
      this.Amount = 12;
      this.ReceivedAmount = 12;
      this.OtherCharges = "0";
      this.Manual = "2345";
      this.Remarks = "fdf";
      this.senderRisk = true;
      this.IsCash = true;
      this.PayMode = "Paid";
    }
  }
  
  export default saveConsignment;
  