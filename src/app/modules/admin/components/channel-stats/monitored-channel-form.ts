import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  CreateMonitoredChannelRequest,
  MonitoredChannel,
  UpdateMonitoredChannelRequest,
} from "@models/channel-stats.model";

export class MonitoredChannelForm extends FormGroup {
  constructor(private readonly channel: MonitoredChannel | null) {
    super({
      channelExternalId: new FormControl(
        channel?.channelExternalId ?? "",
        [Validators.required],
      ),
      channelName: new FormControl(channel?.channelName ?? "", [
        Validators.required,
        Validators.maxLength(200),
      ]),
      discussionChatExternalId: new FormControl(
        channel?.discussionChatExternalId ?? "",
      ),
      isActive: new FormControl(channel?.isActive ?? true),
    });
  }

  get isEditing(): boolean {
    return this.channel != null;
  }

  getCreateRequestOrNull(): CreateMonitoredChannelRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    const channelExternalId = Number(this.value.channelExternalId);
    if (isNaN(channelExternalId) || channelExternalId === 0) {
      return null;
    }

    const discussionChatExternalId = this.value.discussionChatExternalId
      ? Number(this.value.discussionChatExternalId)
      : null;

    if (
      discussionChatExternalId != null &&
      isNaN(discussionChatExternalId)
    ) {
      return null;
    }

    return {
      channelExternalId,
      channelName: this.value.channelName,
      discussionChatExternalId,
    };
  }

  getUpdateRequestOrNull(): UpdateMonitoredChannelRequest | null {
    if (!this.valid) {
      this.markAllAsTouched();
      return null;
    }

    const discussionChatExternalId = this.value.discussionChatExternalId
      ? Number(this.value.discussionChatExternalId)
      : null;

    if (
      discussionChatExternalId != null &&
      isNaN(discussionChatExternalId)
    ) {
      return null;
    }

    return {
      channelName: this.value.channelName,
      discussionChatExternalId,
      isActive: this.value.isActive,
    };
  }
}
